import { redirect } from 'next/navigation';

export default function CommercialCityRedirectPage({ params }: { params: { city: string } }) {
  redirect(`/company-credit-information-report/${params.city}`);
}
