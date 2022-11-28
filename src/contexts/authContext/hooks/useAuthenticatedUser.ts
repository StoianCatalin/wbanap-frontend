import {useEffect, useState} from "react";
import {authApiService, LoginDto, OperationStatus, UserDto} from "services/api/AuthApiService";
import {useLocalStorage} from "hooks/useLocalStorage";

export type UseAuthenticatedUserState = {
    isLoading: boolean;
    user: UserDto | undefined;
    token: string | undefined;
    setUser: (user: UserDto) => void;
    isAuthenticated: boolean;
}

export function useAuthenticatedUser(): UseAuthenticatedUserState {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserDto | undefined>();
    const localStorage = useLocalStorage();
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            // fetch /refresh token
            authApiService.refreshToken(token).then((data: OperationStatus<LoginDto>) => {
                setUser(data.payload?.user);
                localStorage.setItem('token', token);
            });
        }
        setIsLoading(false);
    }, []);

    return {
        user,
        setUser,
        isLoading,
        token,
        isAuthenticated: !!user
    }
}