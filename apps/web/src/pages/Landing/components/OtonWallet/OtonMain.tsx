import { ColumnCenter } from "components/Column";
import { ChangeEvent, ClipboardEvent, createContext, FormEvent, useContext, useEffect, useState } from 'react'
import { BaseButton, ButtonEmphasis, ButtonPrimary, ButtonSize, ThemeButton } from 'components/Button'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { EasyButton, FormSubmitButton, ModalHeading, useOtonWalletContext } from "./OtonWalletModal";
import styled from "styled-components";
import { Input, InputContainer } from "components/Settings/Input";
import { PasswordCustomContainer, PasswordCustomInput, ShowHideIcon } from "./Passphrase";
import fetchWalletData from "./reqs/fetchWallet";
import { OtonModalType, setOtonModalType } from "state/otonWallet/reducer";
import Row from "components/Row";
import { address } from '../../../../nft/components/explore/Cells/Cells.css';

const FormSection = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;


const Container = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;


const CustomContainer = styled(InputContainer)`
  padding: 0px;
  min-width: 80px;
  border: 0px solid transparent;
`;

const CustomInput = styled(Input)`
  text-align: left;
  padding: 4px 8px ;
  border-radius: 8px;
  border: 1px solid ${({theme})=> theme.accent1};
`;

const SideButton = styled(ThemeButton)`
  background: transparent;
  padding: 2.5px;
`;

const Label = styled.label`
  padding: 2px 8px;
  font-size: 12px;
  color: ${({theme})=> theme.neutral2};
`


export function OtonMain() {
    const [password, setPassword] = useState('');
    const [isVisible, setVisible] = useState(false);
    const [error, setError] = useState("");
    const otonWallet = useOtonWalletContext();
    const encryptedPassphrase = useAppSelector((state)=> state.otonWalletPersist.otonUserData?.encryptedPassphrase);
    const dispatch = useAppDispatch();
    useEffect(()=>{
      if(error && password.length >= 8){
        setError("");
      }
    },[password])

    const handleSignIn = async() => {
      console.log({encryptedPassphrase});
      if(encryptedPassphrase){
        const hashedPassword = otonWallet.hashLocalPassword(password);
        const passphrase = otonWallet.decryptPassphrase(encryptedPassphrase, hashedPassword);
        console.log({passphrase});
        otonWallet.signInWithMnemonic(passphrase);
        const address = otonWallet.getAddress();
        if(address){
          const sendData = {
            encryptedPassphrase,
            address,
            hashedPassword,
          };

          console.log({sendData});

          const walletData = await fetchWalletData(sendData);
          if(walletData){
              console.log();
          }
        }else{
          setError("Invalid password");
        }
        
      }
    }

    return (
    <ColumnCenter>
      <ModalHeading>
        Welcome to the Oton Wallet
      </ModalHeading>
        <FormSection>
            <Form onSubmit={(e)=> e.preventDefault()}>
              <Label>
              Password
              </Label>
              <Container>
                  <PasswordCustomContainer error={!!error}>
                      <PasswordCustomInput
                        id={'input-signin-password'}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type={isVisible? "text": "password"}
                        autoComplete="off"
                        data-testid={'input-signin-password'}
                      />
                  </PasswordCustomContainer>
                  <SideButton 
                      id={`toggle-signin-password`} 
                      data-testid={`toggle-signin-password`} 
                      emphasis={ButtonEmphasis.medium} 
                      size={ButtonSize.medium} 
                      onClick={() => setVisible(!isVisible)}>
                  <ShowHideIcon isVisible={isVisible} />
                  </SideButton>
              </Container>
              <FormSubmitButton type="submit" onClick={handleSignIn}>Unlock</FormSubmitButton>
            </Form>
        </FormSection>
        <Row justify="center" gap="5px">
          Don't have an account? 
          <EasyButton onClick={()=>dispatch(setOtonModalType(OtonModalType.Create))}>Create Account</EasyButton>
        </Row>
        
        <EasyButton style={{marginTop: 10}} onClick={()=>dispatch(setOtonModalType(OtonModalType.Forgot))}>Forgot password?</EasyButton>
    </ColumnCenter>
    );
}