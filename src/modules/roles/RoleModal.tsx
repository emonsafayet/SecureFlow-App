import { FormModal } from "@/components/modal/FormModal";
import type { RoleFormValues } from "./RoleForm";
import RoleForm from "./RoleForm";
 

interface Props {
  title: string;
  defaultValues?: RoleFormValues;
  submitting: boolean;
  onSubmit: (values: RoleFormValues) => void;
  onClose: () => void;
}

export default function RoleModal({
  title,
  defaultValues,
  submitting,
  onSubmit,
  onClose,
}: Props) {
  return (
    <FormModal
      open
      title={title}
      submitting={submitting}
      onClose={onClose}
      onSubmit={() =>
        document.getElementById("role-form")?.dispatchEvent(
          new Event("submit", { bubbles: true })
        )
      }
    >
      <RoleForm
        formId="role-form"
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </FormModal>
  );
}
