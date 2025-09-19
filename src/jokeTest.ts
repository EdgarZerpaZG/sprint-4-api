import { getRandomJoke } from "./jokeApi";

export async function jokeStatus(){
    const jokeData = await getRandomJoke();
    if(jokeData){
        return jokeData.status;
    }
    return 500;
}