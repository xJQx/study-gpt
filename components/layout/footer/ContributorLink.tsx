interface ContributorLinkProps {
  href: string;
  name: string;
}

export const ContributorLink = (props: ContributorLinkProps) => {
  const { href, name } = props;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-black hover:text-brand-red font-bold cursor-pointer underline"
    >
      {name}
    </a>
  );
};
