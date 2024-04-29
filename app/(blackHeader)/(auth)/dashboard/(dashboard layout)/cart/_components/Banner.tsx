type BannerProps = {
  variant: 'row' | 'column';
};

export function Banner({ variant }: BannerProps) {
  return (
    <img
      src={`https://static.vismapay.com/pay_banners/${variant}.png`}
      className='aspect-auto'
    />
  );
}
