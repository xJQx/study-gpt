import Link from 'next/link';

interface ButtonLinkProps {
  label: string;
  href: string;
}
export const ButtonLink = ({ label, href }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className="bg-brand-pink hover:bg-brand-red text-white px-[16px] py-[10px] mt-8 lg:mt-0 w-max block rounded"
    >
      <div className="block">{label}</div>
    </Link>
  );
};
