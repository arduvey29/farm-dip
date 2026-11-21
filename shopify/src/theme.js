/*
  Farm Dip theme behaviour, appended after src/lib/motion.ts in assets/farm-dip.js.
  Everything is wired through data attributes, so sections only need the right markup:

    [data-open-dialog="id"]   opens the <dialog id="id"> (menu, cart); [data-close-dialog] closes it
    form[data-product-form]   adds to cart with AJAX, flies a drop of ghee to the cart, opens the drawer
    [data-cart-change]        changes a cart line (data-line, data-qty) and re-renders the drawer
    [data-product]            the product page: variant picker, prices, gallery, milk count, sticky bar
    [data-qty-step]           +/- buttons beside a quantity input
    [data-video]              a muted autoplay video with a [data-video-toggle] sound button
    [data-toggle-target="id"] toggles data-open on #id (the home reviews)
    [data-slideshow]          auto-advancing photo slideshow ([data-track], [data-dot], [data-prev], [data-next])
*/

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const money = (paise) => rupees.format(Math.round(paise / 100));

initMotion(document);

/* ---------- Dialog drawers: mobile menu and cart ---------- */
function openDialog(dialog) {
  if (dialog && !dialog.open) dialog.showModal();
}
document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open-dialog]");
  if (opener) {
    const dialog = document.getElementById(opener.dataset.openDialog);
    if (dialog) {
      e.preventDefault();
      openDialog(dialog);
    }
    return;
  }
  if (e.target.closest("[data-close-dialog]")) {
    e.target.closest("dialog")?.close();
    return;
  }
  // A click on the backdrop lands on the dialog element itself.
  if (e.target instanceof HTMLDialogElement && e.target.classList.contains("drawer")) e.target.close();
});

/* ---------- Cart ---------- */
const CART_SECTION = "cart-drawer";

function renderCart(sections) {
  const html = sections?.[CART_SECTION];
  if (!html) return;
  const fresh = $("[data-cart-body]", new DOMParser().parseFromString(html, "text/html"));
  const current = $("#cart-drawer [data-cart-body]");
  if (fresh && current) current.replaceWith(fresh);
  const count = fresh?.dataset.count ?? "0";
  $$("[data-cart-count]").forEach((el) => {
    el.textContent = count;
    el.hidden = count === "0";
  });
}

async function cartRequest(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...body, sections: CART_SECTION, sections_url: window.location.pathname }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.description || json.message || "Could not update your cart. Please try again.");
  return json;
}

document.addEventListener("submit", async (e) => {
  const form = e.target.closest("form[data-product-form]");
  if (!form) return;
  e.preventDefault();
  const button = e.submitter || $("[type=submit]", form);
  const data = new FormData(form);
  const error = $("[data-form-error]", form);
  if (error) error.hidden = true;
  button?.setAttribute("aria-busy", "true");
  try {
    const json = await cartRequest("/cart/add.js", {
      items: [{ id: Number(data.get("id")), quantity: Math.max(1, Number(data.get("quantity") || 1)) }],
    });
    if (button?.hasAttribute("data-buy-now")) {
      window.location.href = "/checkout";
      return;
    }
    flyToCart(button || form, () => {
      renderCart(json.sections);
      openDialog(document.getElementById("cart-drawer"));
    });
  } catch (err) {
    if (error) {
      error.textContent = err.message;
      error.hidden = false;
    } else alert(err.message);
  } finally {
    button?.removeAttribute("aria-busy");
  }
});

document.addEventListener("click", async (e) => {
  const link = e.target.closest("[data-cart-change]");
  if (!link) return;
  e.preventDefault();
  link.setAttribute("aria-busy", "true");
  try {
    const json = await cartRequest("/cart/change.js", { line: Number(link.dataset.line), quantity: Number(link.dataset.qty) });
    renderCart(json.sections);
  } catch (err) {
    alert(err.message);
  }
});

/* ---------- Quantity steppers ---------- */
document.addEventListener("click", (e) => {
  const step = e.target.closest("[data-qty-step]");
  if (!step) return;
  const input = $("input[type=number]", step.closest("[data-qty]"));
  if (!input) return;
  const next = Math.min(Number(input.max || 99), Math.max(Number(input.min || 1), Number(input.value || 1) + Number(step.dataset.qtyStep)));
  input.value = String(next);
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

/* ---------- Product page ---------- */
const CAN_LITRES = 5;
function milkCan(part = 1) {
  const fill = part < 1 ? `<rect x="3.5" y="${(18.5 - 10 * part).toFixed(2)}" width="9" height="${(10 * part).toFixed(2)}" fill="#fffaf0"/>` : "";
  return `<svg viewBox="0 0 16 20" class="h-5 w-4" aria-hidden="true" focusable="false"><path d="M5 2h6v3l2 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8l2-3Z" fill="${part >= 1 ? "#fffaf0" : "#e3cfa6"}"/>${fill}<path d="M5 2h6v3l2 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8l2-3Z" fill="none" stroke="var(--color-ink-700)" stroke-width="1"/><path d="M4 1.5h8" stroke="var(--color-ink-700)" stroke-width="1.4" stroke-linecap="round"/></svg>`;
}

$$("[data-product]").forEach((root) => {
  const variants = JSON.parse($("script[data-variants]", root)?.textContent || "[]");
  const litresPerLitre = Number(root.dataset.milkPerLitre || 0);
  const idInputs = $$("form[data-product-form] input[name=id]", root);
  let shownMilk = Number($("[data-milk-litres]", root)?.dataset.value || 0);
  let stopCount = () => {};

  function showImage(src, alt) {
    const main = $("[data-main-image]", root);
    if (!main || !src) return;
    main.src = src;
    main.removeAttribute("srcset");
    if (alt) main.alt = alt;
    $$("[data-thumb]", root).forEach((t) => t.setAttribute("aria-current", String(t.dataset.src === src)));
  }

  function select(id) {
    const v = variants.find((x) => String(x.id) === String(id));
    if (!v) return;
    idInputs.forEach((input) => (input.value = v.id));
    $$("[data-price]", root).forEach((el) => (el.textContent = money(v.price)));
    $$("[data-variant-label]", root).forEach((el) => (el.textContent = v.title));
    const off = v.compare_at_price > v.price ? Math.round(((v.compare_at_price - v.price) / v.compare_at_price) * 100) : 0;
    $$("[data-off-wrap]", root).forEach((el) => (el.hidden = !off));
    $$("[data-mrp]", root).forEach((el) => (el.textContent = money(v.compare_at_price || 0)));
    $$("[data-off]", root).forEach((el) => (el.textContent = `${off}% off`));
    $$("[data-per-litre]", root).forEach((el) => (el.textContent = money((v.price * 1000) / v.volume_ml)));
    $$("[data-add-button]", root).forEach((b) => {
      b.disabled = !v.available;
      if (b.dataset.soldOut && b.dataset.add) b.textContent = v.available ? b.dataset.add : b.dataset.soldOut;
    });
    if (v.image) showImage(v.image, v.image_alt);
    // The milk behind the chosen pack, counted up in 5-litre cans.
    const litres = (v.volume_ml / 1000) * litresPerLitre;
    const number = $("[data-milk-litres]", root);
    if (number && litresPerLitre) {
      stopCount();
      stopCount = countUp(shownMilk, litres, (n) => {
        shownMilk = n;
        number.textContent = `${Math.round(n)} L`;
      });
      const full = Math.floor(litres / CAN_LITRES);
      const rest = litres / CAN_LITRES - full;
      const cans = $("[data-milk-cans]", root);
      if (cans) cans.innerHTML = milkCan().repeat(full) + (rest > 0.05 ? milkCan(rest) : "");
    }
    const url = new URL(window.location.href);
    url.searchParams.set("variant", v.id);
    window.history.replaceState(null, "", url);
  }

  root.addEventListener("change", (e) => {
    if (e.target.matches("[data-variant-input]")) select(e.target.value);
  });
  root.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-thumb]");
    if (thumb) showImage(thumb.dataset.src, thumb.dataset.alt);
  });

  // Phones: a sticky add-to-cart bar once the main buttons scroll away.
  const cta = $("[data-cta]", root);
  const bar = $("[data-sticky-bar]", root);
  if (cta && bar) {
    new IntersectionObserver(([entry]) => {
      const show = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      bar.toggleAttribute("data-show", show);
      bar.setAttribute("aria-hidden", String(!show));
    }).observe(cta);
  }
});

/* ---------- Hero video sound ---------- */
$$("[data-video]").forEach((wrap) => {
  const video = $("video", wrap);
  const button = $("[data-video-toggle]", wrap);
  if (!video || !button) return;
  video.muted = true;
  video.play().catch(() => {});
  button.addEventListener("click", () => {
    video.muted = !video.muted;
    if (video.paused) video.play().catch(() => {});
    button.toggleAttribute("data-muted", video.muted);
    button.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
  });
});

/* ---------- Toggles (home reviews) ---------- */
document.addEventListener("click", (e) => {
  const toggle = e.target.closest("[data-toggle-target]");
  if (!toggle) return;
  const target = document.getElementById(toggle.dataset.toggleTarget);
  if (!target) return;
  const open = !target.hasAttribute("data-open");
  target.toggleAttribute("data-open", open);
  $$(`[data-toggle-target="${target.id}"]`).forEach((t) => t.setAttribute("aria-expanded", String(open)));
});

/* ---------- Photo slideshows ---------- */
$$("[data-slideshow]").forEach((show) => {
  const track = $("[data-track]", show);
  const dots = $$("[data-dot]", show);
  const total = track ? track.children.length : 0;
  if (total < 2) return;
  const interval = Number(show.dataset.interval || 4000);
  let index = 0;
  let paused = false;
  let timer = 0;
  const go = (i) => {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, k) => d.toggleAttribute("data-active", k === index));
  };
  const schedule = (delay = interval) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (!paused) go(index + 1);
      schedule();
    }, delay);
  };
  $("[data-prev]", show)?.addEventListener("click", () => go(index - 1));
  $("[data-next]", show)?.addEventListener("click", () => go(index + 1));
  dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
  show.addEventListener("mouseenter", () => (paused = true));
  show.addEventListener("mouseleave", () => (paused = false));
  let startX = null;
  show.addEventListener("touchstart", (e) => ((startX = e.touches[0].clientX), (paused = true)), { passive: true });
  show.addEventListener("touchend", (e) => {
    const dx = startX === null ? 0 : e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    startX = null;
    paused = false;
  });
  schedule(interval + Number(show.dataset.delay || 0));
});

/* ---------- Copy buttons (contact page) ---------- */
document.addEventListener("click", async (e) => {
  const button = e.target.closest("[data-copy]");
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    const label = button.querySelector("span") || button;
    const before = label.textContent;
    label.textContent = "Copied";
    window.setTimeout(() => (label.textContent = before), 1500);
  } catch {}
});

/* ---------- FAQ page: search and topic filter ---------- */
$$("[data-faq]").forEach((faq) => {
  const items = $$("[data-faq-item]", faq);
  const input = $("[data-faq-search]", faq);
  const count = $("[data-faq-count]", faq);
  const empty = $("[data-faq-empty]", faq);
  let topic = "all";
  const apply = () => {
    const q = (input?.value || "").trim().toLowerCase();
    let shown = 0;
    items.forEach((item) => {
      const match = (topic === "all" || item.dataset.topic === topic) && (!q || item.textContent.toLowerCase().includes(q));
      item.hidden = !match;
      if (match) shown++;
      if (q && match && shown <= 2) item.open = true;
    });
    if (count) count.textContent = String(shown);
    if (empty) empty.hidden = shown > 0;
  };
  input?.addEventListener("input", apply);
  faq.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-faq-query]");
    if (chip && input) {
      input.value = chip.dataset.faqQuery;
      apply();
    }
    const tab = e.target.closest("[data-faq-topic]");
    if (tab) {
      topic = tab.dataset.faqTopic;
      $$("[data-faq-topic]", faq).forEach((t) => t.toggleAttribute("data-active", t === tab));
      apply();
    }
    if (e.target.closest("[data-faq-expand]")) {
      const visible = items.filter((i) => !i.hidden);
      const open = !visible.every((i) => i.open);
      visible.forEach((i) => (i.open = open));
    }
  });
});
