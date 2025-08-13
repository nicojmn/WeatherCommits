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
    let codes: number[] = []
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
    await api.get("/forecast", { params })
        .then((response) => {
            if (response.data && response.data.daily && response.data.daily.weather_code) {
                codes = response.data.daily.weather_code
                console.log("Data : ", response.data.daily.weather_code)
            } else {
                console.warn("No weather codes found in the response.")
            }
        })
        .catch((error) => {
            console.error("Error fetching weather codes:", error)
        })
    return codes
}
