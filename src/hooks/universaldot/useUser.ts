import { useSelector, useDispatch } from '../../redux/store';
import {
  setKeyringOptionsAction,
  setSelectedKeyringAction,
} from '../../redux/slices/accountSlice';

const useUser = () => {
  const dispatch = useDispatch();

  const selectedKeyring = useSelector(state => state.account.selectedKeyring);
  const keyringOptions = useSelector(state => state.account.keyringOptions);

  const setKeyringOptions = (keyringOptionsArray: any) => {
    dispatch(setKeyringOptionsAction(keyringOptionsArray));
    dispatch(
      setSelectedKeyringAction({
        key: keyringOptionsArray[0].text,
        value: keyringOptionsArray[0].value,
        text: keyringOptionsArray[0].text,
      })
    );
  };

  const setSelectedKeyring = (keyring: any) => {
    dispatch(setSelectedKeyringAction(keyring));
  };

  return {
    selectedKeyring,
    setKeyringOptions,
    keyringOptions,
    setSelectedKeyring,
  };
};

export { useUser };
