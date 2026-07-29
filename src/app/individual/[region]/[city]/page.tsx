import { redirect } from 'next/navigation';

export default function IndividualCityRedirectPage({ params }: { params: { city: string } }) {
  redirect(`/credit-report-repair-agency/${params.city}`);
}
