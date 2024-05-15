// api.ts
import { SearchParam } from "@/types/instSearch";
import axios from "axios";

const access_token =
      "EAAGeJ5q6nBcBO56Q2ab6ZBnIi4bol9R2Ypmo9jS6tWPZAldbdRPIA3mv5z7hwd2iEIjpThZBhj2RYP2QM3oZCJovhZBZBFeKqZBlHw15iJsCvw7oIOtSx9vW4Tt6Y3tvaX5lilY8yGiMlVCbIpSPZAXcZCEYFx8dlNnj5dV29vUXf8GVst9ZBcXqXNWFQuHj0lhlRbML6hZC0xo";
const user_id = "17841465850618427";

async function searchTag(value: SearchParam) {
  try {
    const res = await axios.get(
      `https://graph.facebook.com/v19.0/ig_hashtag_search?user_id=${user_id}&q=${value.tag}&access_token=${access_token}`
    );
    return res.data.data[0].id;;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function searchPost(id: string, type?: string) {
  try {
    const res = await axios.get(
      `https://graph.facebook.com/v19.0/${id}/${type}_media?user_id=${user_id}&fields=id,media_type,media_url,comments_count,like_count,children%7Bid%2Cmedia_type%2Cmedia_url%7D&access_token=${access_token}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function searchPostedData(param: SearchParam) {
  try {
    const id =  await searchTag(param);
    const res = await searchPost(id, param.dataType);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
