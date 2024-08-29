import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "User signed up successfully. Please open email account and verify from user's email"
      );
    },
    onError: () => {
      toast.error('Error occurred signing up user');
    },
  });

  return { signup, isLoading };
};
