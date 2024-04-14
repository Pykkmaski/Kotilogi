type PaymentStatusProps = {
  resultCode: number;
};

const Heading = ({ children }) => {
  return <h1 className='text-4xl'>{children}</h1>;
};

export function PaymentStatus({ resultCode }: PaymentStatusProps) {
  const getContent = () => {
    switch (resultCode) {
      case 0: {
        //Sucsessfull payment
        return <Heading>Maksu Onnistui!</Heading>;
      }

      case 1: {
        //Validation error or invalid token
        return <Heading>Varmennus epäonnistui!</Heading>;
      }

      case 2: {
        //Payment failed
        return <Heading>Maksu epäonnistui!</Heading>;
      }

      case 3: {
        //The payment is in incoming state and has not been finished by the customer. Try again later.
        return <Heading>Maksua ei suoritettu loppuun. Yritä myöhemmin uudelleen.</Heading>;
      }

      case 4: {
        //The status of the payment is reversed (authorized and then cancelled by the merchant).
        return <Heading>Maksu on peruutettu kauppiaan toimesta.</Heading>;
      }

      case 10: {
        //Maintenance break.
        return <Heading>Ylläpitotauko</Heading>;
      }

      default: {
        return <Heading>Odottamaton Virhe</Heading>;
      }
    }
  };

  return getContent();
}
