import axios from "axios"

const METEO_API_URL = "https://historical-forecast-api.open-meteo.com"
const VERSION = "v1"

const api = axios.create({
    baseURL: `${METEO_API_URL}/${VERSION}`,
})

function sortDates(dates: string[]): string[] {
    return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

export async function weatherCodes(dates: string[], latitude: number, longitude: number): Promise<number[]> {
    dates = sortDates(dates)
    let start = dates[0]; let end = dates[dates.length - 1]

    const params = {
        daily: "weather_code",
        latitude: latitude,
        longitude: longitude,
        start_date: start,
        end_date: end,
    }

    console.log("Params :", params)
    const resp = await api.get("/forecast", { params })
    const daily = await resp.data?.daily
    console.log("Daily", daily)

    const codes = daily.time
        .map((date: string, i: number) => ({
            date,
            code: daily.weather_code[i]
        }))
        .filter((item: any) => dates.includes(item.date))
        .map((item: any) => item.code);
    return codes
}
