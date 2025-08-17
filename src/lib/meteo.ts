import axios from "axios"

const METEO_API_URL = "https://historical-forecast-api.open-meteo.com"
const VERSION = "v1"

const api = axios.create({
    baseURL: `${METEO_API_URL}/${VERSION}`,
})

function sortDates(dates: string[]): string[] {
    return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

export function codesMap(): Map<number, object> {
    return new Map([
        [0, { desc: "Clear sky", svg: "sun" }],
        [1, { desc: "Mainly clear", svg: "sun" }],
        [2, { desc: "Partly cloudy", svg: "sun" }],
        [3, { desc: "Overcast", svg: "cloud" }],
        [45, { desc: "Fog", svg: "fog" }],
        [48, { desc: "Depositing rime fog", svg: "fog" }],
        [51, { desc: "Drizzle light", svg: "drizzle" }],
        [53, { desc: "Drizzle moderate", svg: "drizzle" }],
        [55, { desc: "Drizzle dense intensity", svg: "drizzle" }],
        [56, { desc: "Freezing drizzle light", svg: "drizzle" }],
        [57, { desc: "Freezing drizzle dense intensity", svg: "drizzle" }],
        [61, { desc: "Rain slight", svg: "rain" }],
        [63, { desc: "Rain moderate", svg: "rain" }],
        [65, { desc: "Rain heavy intensity", svg: "rain" }],
        [66, { desc: "Freezing rain light", svg: "rain" }],
        [67, { desc: "Freezing rain heavy intensity", svg: "rain" }],
        [71, { desc: "Snow fall slight", svg: "snow" }],
        [73, { desc: "Snow fall moderate", svg: "snow" }],
        [75, { desc: "Snow fall heavy intensity", svg: "snow" }],
        [77, { desc: "Snow grains", svg: "snow" }],
        [80, { desc: "Rain showers slight", svg: "rain" }],
        [81, { desc: "Rain showers moderate", svg: "rain" }],
        [82, { desc: "Rain showers violent", svg: "rain" }],
        [85, { desc: "Snow showers slight", svg: "rain" }],
        [86, { desc: "Snow showers heavy", svg: "rain" }],
        [95, { desc: "Thunderstorm slight or moderate", svg: "thunder" }],
        [96, { desc: "Thunderstorm with slight hail", svg: "thunder" }],
        [99, { desc: "Thunderstorm with heavy hail", svg: "thunder" }],
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
