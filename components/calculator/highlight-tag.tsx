interface HighlightTagProps {
  text: string;
  className?: string
}

const HighlightTag = ({
  text,
  className = "text-orange-600",
}: HighlightTagProps) => {
  return <b className={className}>{text}</b>;
};

export default HighlightTag;
