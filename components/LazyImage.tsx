import { useRef, useEffect, useState, ImgHTMLAttributes } from "react";

type LazyImageProps = {
  src: string;
  onLazyLoad?: (node: HTMLImageElement) => void;
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNative;

export const LazyImage = ({src, ...imgProps}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSrc(prevState => {
            if(prevState !== src && !isLoaded) {
              imgProps.onLazyLoad && imgProps.onLazyLoad(entry.target as HTMLImageElement);
              setIsLoaded(true);
              observer.disconnect();
            }
            return src
          });
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      ref={node}
      src={currentSrc}
      {...imgProps}
    />
  );
};
