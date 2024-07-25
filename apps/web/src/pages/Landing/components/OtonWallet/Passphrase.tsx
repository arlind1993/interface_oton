
import { ButtonEmphasis, ButtonSize, ThemeButton } from 'components/Button';
import Column, { ColumnCenter } from 'components/Column';
import { Input, InputContainer } from 'components/Settings/Input';
import { margin } from 'polished';
import { ChangeEvent, ClipboardEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { setPassphrase, setPassphraseError, setVisibility, updatePassphrases } from 'state/otonWallet/reducer';
import styled from 'styled-components'
import { BelowLabel } from './OtonCreate';


const GridContainer = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 16px;
  max-width: 600px;
`;



export const PasswordCustomContainer = styled(InputContainer)<{margin?: string}>`
  position: relative;
  padding: 0px;
  min-width: 80px;
  border-radius: 8px;
  ${({margin})=>margin?"margin "+margin+";": ""}
`;

export const PasswordCustomInput = styled(Input)`
  text-align: left;
  padding: 4px 8px ;
`;

const ErrorDisplay = styled.div`
  position: absolute;
  bottom: -12px;
`;


const SideButton = styled(ThemeButton)`
  background: transparent;
  padding: 2.5px;
`;


const Container = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Icon = styled.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
`;

export const ShowHideIcon = ({ isVisible }: { isVisible: boolean }) => (
  <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
    {isVisible ? (
      <path d="M320 64C197.08 64 89.72 135.59 9.77 241.81a32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448s230.28-71.59 310.23-177.81a32.35 32.35 0 0 0 0-29.19C550.28 135.59 442.92 64 320 64zm0 352c-98.65 0-189.08-55-237.93-144C130.91 183 221.34 128 320 128c36.7 0 71.71 7.05 104.63 18.81l-46.41 36.28c-18.94-4.3-38.34-7.1-58.22-7.1-63.36 0-116.47 46.41-127.77 106.18a285.53 285.53 0 0 1 44 60.2 285.47 285.47 0 0 1-44.05 60.19c18.94 4.3 38.34 7.1 58.22 7.1 63.36 0 116.47-46.41 127.77-106.18A285.47 285.47 0 0 1 320 416z"/>
    ) : (
      <path d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"/>
    )}
  </Icon>
);


const InputField = ({ index }: { index: number }) => {
    const isVisible = useAppSelector((state) => state.otonWallet.visibilities[index]);
    const passphrase = useAppSelector((state) => state.otonWallet.passphrases[index]);
    const error = useAppSelector((state) => state.otonWallet.errors[index]);
    
    const dispatch = useAppDispatch();

    useEffect(()=>{
      if(error && passphrase){
        dispatch(setPassphraseError({pos: index, input: ""}));
      }
    },[passphrase])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e);
      dispatch(setPassphrase({pos: index, input: e.target.value}));
    }
  
    const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
      const pastedData = e.clipboardData.getData('Text').trim();
      e.preventDefault();
      const splitted = pastedData.split(/\s+/);
      console.log('Pasted content:', splitted);
      if(splitted.length == 12){
        dispatch(updatePassphrases(splitted));
      }else{
        dispatch(setPassphrase({pos: index, input: pastedData}));
      }
      
    }
  
    return (
      <Container>
        <Label htmlFor={`input-${index}`}>
          {index + 1}.
        </Label>
          <PasswordCustomContainer error={!!error}>
            <PasswordCustomInput
              id={`input-${index}`}
              value={passphrase}
              onChange={onChange}
              onPaste={onPaste}
              type={isVisible? "text": "password"}
              autoComplete="off"
              data-testid={`input-${index}`}
            />
          <ErrorDisplay><BelowLabel>{error}</BelowLabel></ErrorDisplay>
          </PasswordCustomContainer>
        
        <SideButton 
            id={`toggle-${index}`} 
            data-testid={`toggle-${index}`} 
            emphasis={ButtonEmphasis.medium} 
            size={ButtonSize.medium} 
            onClick={() => dispatch(setVisibility({pos: index, input: !isVisible}))}>
          <ShowHideIcon isVisible={isVisible} />
        </SideButton>
      </Container>
    );
  };




export function Passphrase(){
    return (
        <GridContainer>
            {Array.from({ length: 12 }, (_, index) => (
            <InputField key={index} index={index} />
            ))}
        </GridContainer>
    )
}