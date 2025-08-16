import axios from "axios"

const METEO_API_URL = "https://historical-forecast-api.open-meteo.com"
const VERSION = "v1"

const api = axios.create({
    baseURL: `${METEO_API_URL}/${VERSION}`,
})

function sortDates(dates: string[]): string[] {
    return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

export function codesMap(): Map<number, string> {
    return new Map([
        [0, "Clear sky"],
        [1, "Mainly clear"],
        [2, "Partly cloudy"],
        [3, "Overcast"],
        [45, "Fog"],
        [48, "Depositing rime fog"],
        [51, "Light drizzle"],
        [53, "Moderate drizzle"],
        [55, "Dense drizzle"],
        [56, "Light freezing drizzle"],
        [57, "Dense freezing drizzle"],
        [61, "Slight rain"],
        [63, "Moderate rain"],
        [65, "Heavy rain"],
        [66, "Light freezing rain"],
        [67, "Heavy freezing rain"],
        [71, "Slight snowfall"],
        [73, "Moderate snowfall"],
        [75, "Heavy snowfall"],
        [77, "Snow grains"],
        [80, "Slight rain showers"],
        [81, "Moderate rain showers"],
        [82, "Violent rain showers"],
        [85, "Slight snow showers"],
        [86, "Heavy snow showers"],
        [95, "Slight or moderate thunderstorm"],
        [96, "Thunderstorm with slight hail"],
        [99, "Thunderstorm with heavy hail"]
    ]);
}

export async function weatherCodes(dates: string[], latitude: number, longitude: number, lastYear: boolean): Promise<number[]> {
    dates = sortDates(dates)
    let start = dates[0]; let end = dates[dates.length - 1]

    if (lastYear) {
        let tmp = new Date(end)
        tmp.setFullYear(tmp.getFullYear() - 1)
        start = tmp.toISOString().split("T")[0]
    }

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
