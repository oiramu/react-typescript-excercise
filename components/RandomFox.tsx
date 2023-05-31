interface Props {
  image: string;
}

export const RandomFox = (props: Props): JSX.Element => {

  return <img width={320} height="auto" src={props.image} className="rounded" />;
};
