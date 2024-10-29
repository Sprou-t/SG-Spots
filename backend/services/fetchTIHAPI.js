import axios from "axios";

const BASE_URL = "http://api.stb.gov.sg";
const END_POINT = "/cruises";

const fetchTIHData = async () => {
	try {
		const response = await axios.fetch(`${BASE_URL}${END_POINT}`, {
			headers: {
				Accept: "application/json",
				"X-Content-Language": "en",
				"X-API-Key": TIH_API_KEY,
			},
		});
	} catch (error) {
		console.error(`error in fetching TIH data: ${error}`);
	}
	return response.data;
};

export default fetchTIHData
