import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, error, settings } = useSettings();
  const { isUpdating, updateSettings } = useUpdateSetting();
  if (!settings) return <Spinner />;

  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
  } = settings;

  const handleUpdate = (e, settingName) => {
    const { value } = e.target;
    if (!value) return;
    updateSettings({ [settingName]: value });
  };
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating || isLoading}
          onBlur={(e) => {
            handleUpdate(e, "minBookingLength");
          }}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating || isLoading}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => {
            handleUpdate(e, "maxBookingLength");
          }}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating || isLoading}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => {
            handleUpdate(e, "maxGuestsPerBooking");
          }}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating || isLoading}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => {
            handleUpdate(e, "breakfastPrice");
          }}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
