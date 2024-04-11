import db from "kotilogi-app/dbconfig";
import { PageContent } from "./page.components";
import * as usage from "@/actions/usage";

import { Header } from "./Header";

export default async function UsagePage({ params, searchParams }) {
  const type = searchParams.type as Kotilogi.UsageTypeType | "all";
  var year = searchParams.year as string | undefined;

  if (!year) {
    //Fetch all usage data for this property, and assign the year as the most recent year with usage-data.
    const dates = await db("usage")
      .where({ refId: params.property_id })
      .select("time")
      .orderBy("time", "desc");
    if (dates.length) {
      year = new Date(dates.at(0).time).getFullYear().toString();
    } else {
      //No usage data added yet. Arbitrarily set the year to the current year.
      year = new Date().getFullYear().toString();
    }
  }

  var usageQuery =
    type === "all"
      ? {
          refId: params.property_id,
        }
      : {
          refId: params.property_id,
          type,
        };

  //Get the data for the selected year, and the timestamps for all data, to render the year selector.
  const [data, timestamps] = await Promise.all([
    usage.get(usageQuery, year || "all"),
    db("usage").select("time"),
  ]);

  if (!data || !timestamps)
    throw new Error("Kulutustietojen lataus epäonnistui!");

  data.sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();

    return timeA - timeB;
  });

  var displayYear = "all";
  if (data.length) {
    displayYear = new Date(data.at(-1).time).getFullYear().toString();
  }

  return (
    <main className="w-full flex flex-col gap-4">
      <Header timestamps={timestamps} displayYear={displayYear} type={type} />
      <PageContent data={data} displayYear={displayYear} type={type} />
    </main>
  );
}
