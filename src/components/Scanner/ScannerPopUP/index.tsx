import React, { useEffect, useState } from 'react';
import { ScannerPopUPContainer, ScannerPopUPModal, ScannerPopUPSubContainer, ScannerPopUPSubContainerCloseButton, ScannerPopUPSubContainerIconContainer, ScannerPopUPSubContainerText, ScannerPopUPSubContainerTitle } from './styles';

import GiftIcon from '../../../assets/images/Icons/scanner/gift_icon.svg';
import CheckIcon from '../../../assets/images/Icons/scanner/check_icon.svg';
import CloseIcon from '../../../assets/images/Icons/scanner/close_icon.svg';
import CancelIcon from '../../../assets/images/Icons/scanner/cancel_icon.svg';
import { QRCode } from '../../../types/QRCode';

interface ScannerPopUPPros
{
  title: string | undefined;
  subtitle: string | undefined;
  icon: string | undefined;
  press: () => void;
}

const ScannerPopUP = ( {
  title,
  subtitle,
  icon,
  press,
}: ScannerPopUPPros ) =>
{
  const [isVisible, setIsVisible] = useState(true);
  const [myTimeout, setMyTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {

    setMyTimeout( 
      setTimeout(() => {
        setIsVisible(false);
        press();
      }, 3000)
    );
  }, []);

  return (
    <ScannerPopUPModal 
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <ScannerPopUPContainer>
        <ScannerPopUPSubContainer>
          <ScannerPopUPSubContainerIconContainer>
            { icon === 'gift' && <GiftIcon /> }
            { icon === 'check' && <CheckIcon /> }
            { icon === 'close' && <CloseIcon /> }
          </ScannerPopUPSubContainerIconContainer>

          <ScannerPopUPSubContainerTitle>
            { title }
          </ScannerPopUPSubContainerTitle>
          <ScannerPopUPSubContainerText>
            { subtitle }
          </ScannerPopUPSubContainerText>

          <ScannerPopUPSubContainerCloseButton
            onPress={ () => {
              setIsVisible(false);
              clearTimeout(myTimeout as NodeJS.Timeout);
              press();
            } }
          >
            <CancelIcon />
          </ScannerPopUPSubContainerCloseButton>
        </ScannerPopUPSubContainer>
      </ScannerPopUPContainer>
    </ScannerPopUPModal>
  );
};

export default ScannerPopUP;
