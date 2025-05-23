import { useCallback, useState } from "react";
import { t } from "ttag";

import ModalContent from "metabase/components/ModalContent";
import Button from "metabase/core/components/Button";
import { FormMessage } from "metabase/forms";
import type { User } from "metabase-types/api";

import { ModalMessage } from "./UnsubscribeUserForm.styled";

interface UnsubscribeUserFormProps {
  user: User;
  onUnsubscribe: (user: User) => void | Promise<void>;
  onClose: () => void;
}

export const UnsubscribeUserForm = ({
  user,
  onUnsubscribe,
  onClose,
}: UnsubscribeUserFormProps) => {
  const [error, setError] = useState<any>();

  const handleConfirmClick = useCallback(async () => {
    try {
      await onUnsubscribe(user);
      onClose();
    } catch (error) {
      setError(error);
    }
  }, [user, onUnsubscribe, onClose]);

  return (
    <ModalContent
      title={t`Unsubscribe ${user.common_name} from all subscriptions and alerts?`}
      footer={[
        error ? <FormMessage key="message" formError={error} /> : null,
        <Button key="cancel" onClick={onClose}>{t`Cancel`}</Button>,
        <Button
          key="submit"
          danger
          onClick={handleConfirmClick}
        >{t`Unsubscribe`}</Button>,
      ]}
      onClose={onClose}
    >
      <ModalMessage>
        {t`This will delete any dashboard subscriptions or alerts ${user.common_name} has created, and remove them as a recipient from any other subscriptions or alerts.`}
      </ModalMessage>
      <ModalMessage>
        {/* eslint-disable-next-line no-literal-metabase-strings -- Metabase settings */}
        {t`This does not affect email distribution lists that are managed outside of Metabase.`}
      </ModalMessage>
    </ModalContent>
  );
};
