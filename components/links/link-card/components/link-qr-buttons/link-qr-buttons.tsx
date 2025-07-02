import LinkQrDesktop from "./components/link-qr-desktop/link-qr-desktop";
import LinkQrMobile from "./components/link-qr-mobile/link-qr-mobile";

interface Props {
  url: string;
}

export default function LinkQrButtons({ url }: Props) {
  return (
    <>
      <LinkQrMobile url={url} />
      <LinkQrDesktop url={url} />
    </>
  );
}
