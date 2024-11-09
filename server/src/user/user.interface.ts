export interface IUserService {
    userEmailExists(email: string): Promise<void>;
}