export type JarData = {
  amount: number;
  prevAmount: number;
  noOfDonations: number;
  title: string;
  goal: number;
};

export async function getJarData(): Promise<JarData> {
  const res = await fetch(
    "https://bossan.musikhjalpen.se/api/fundraisers/7vFk9IX38LLnD3akdrZjJ8?fields[]=amount&fields=prev_amount"
  );
  const json = await res.json();

  const res2 = await fetch(
    "https://bossan.musikhjalpen.se/api/fundraisers/donations/7vFk9IX38LLnD3akdrZjJ8/number-of-donations"
  );
  const json2 = await res2.json();

  const res3 = await fetch(
    "https://bossan.musikhjalpen.se/page-data/mpyahjaelpen/page-data.json"
  );
  const json3 = await res3.json();

  return {
    amount: json?.amount,
    prevAmount: json?.prev_amount,
    noOfDonations: json2,
    title: json3?.result?.data?.contentfulFundraiser?.title,
    goal: json3?.result?.data?.contentfulFundraiser?.goal ?? 10000,
  };
}
