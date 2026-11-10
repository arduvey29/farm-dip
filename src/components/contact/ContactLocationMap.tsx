import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

export function ContactLocationMap() {
  const { address } = site;
  const fullAddress = `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address.locality}, ${address.region}, India`)}`;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const embedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(`${site.name}, ${address.locality}, ${address.region}, India`)}&zoom=14`
    : `https://maps.google.com/maps?q=${encodeURIComponent(`${address.locality}, ${address.region}, India`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="pt-2">
      <div className="mb-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-ink-600">
          <Icon name="pin" className="size-3.5 text-ghee-700" />
          <span className="font-medium text-ink-900">{address.locality}, {address.region}</span>
          <span className="text-ink-400">•</span>
          <span className="text-ink-500">Farm & Origin</span>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[0.72rem] font-medium text-pasture-800 hover:underline"
        >
          <span>Open Maps</span>
          <Icon name="arrowRight" className="size-2.5" />
        </a>
      </div>

      <div className="relative h-44 w-full overflow-hidden rounded-xl border border-line/70 sm:h-48">
        <iframe
          src={embedUrl}
          title={`${site.name} location on Google Maps`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full grayscale-[10%] contrast-[105%]"
        />

        <div className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-cream/90 px-2 py-0.5 text-[0.65rem] font-medium text-ink-700 backdrop-blur-xs">
          {fullAddress}
        </div>
      </div>
    </div>
  );
}
