import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User updated successfully');
      queryClient.setQueryData(['user'], user);
      // queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: ({ err }) => {
      console.log(err);
      toast.error('User update failed');
    },
  });

  return { isUpdating, updateUser };
};
