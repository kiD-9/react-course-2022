export type TokenContext = {
    bearerToken: string;
    setBearerToken: React.Dispatch<React.SetStateAction<string>>;
}