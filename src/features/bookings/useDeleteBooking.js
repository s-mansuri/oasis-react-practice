import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking deleted successfully');
      //   navigate('/bookings');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: () => toast.error('There is some error deleting booking'),
  });

  return { isDeleting, deleteBooking };
};
