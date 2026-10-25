import Image from 'next/image';

export function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] rotate-3 aspect-square overflow-hidden rounded-[36px] border-[3px] border-ink bg-lilac shadow-pop-lg">
      <Image
        src="/images/joydeep.webp"
        alt="Joydeep Sarkar"
        fill
        sizes="340px"
        className="object-cover object-top"
        priority
      />
    </div>
  );
}
