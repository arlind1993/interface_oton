import { ColumnCenter } from "components/Column";
import { ChangeEvent, ClipboardEvent, createContext, FormEvent, useEffect, useState } from 'react'
import { BaseButton, ButtonEmphasis, ButtonPrimary, ButtonSize, ThemeButton } from 'components/Button'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import styled from "styled-components";
import { BackButton, FormSubmitButton, ModalDescription, ModalHeading, useOtonWalletContext } from "./OtonWalletModal";
import { OtonModalType, setOtonModalType, updatePassphraseErrors } from "state/otonWallet/reducer";
import { Passphrase, PasswordCustomContainer, PasswordCustomInput, ShowHideIcon } from "./Passphrase";
import { calculateStrength } from "./password";
import { BelowLabel, ShowBar } from "./OtonCreate";


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

const SideButton = styled(ThemeButton)`
  background: transparent;
  padding: 2.5px;
`;


const Label = styled.label`
  padding: 2px 8px;
  font-size: 12px;
  color: ${({theme})=> theme.neutral2};
`


enum ErrorType {
    small,
    unequal
}


export function OtonForgot() {
    const otonWallet = useOtonWalletContext();
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const [isVisibleConfirm, setVisibleConfirm] = useState(false);
    const [error, setError] = useState<ErrorType | null>(null);
    const passphrases = useAppSelector((state) => state.otonWallet.passphrases);

    useEffect(()=>{
        if((error == ErrorType.small && password.length >= 8) || (error == ErrorType.unequal && password == passwordConfirm)){
            setError(null);
        }
    },[password,passwordConfirm]);

    const validate = () => {
        const data: {
            passphrase?: string
            error: Array<string>
        } = {
            error: []
        }

        // const passphrase = "alter video cream staff fine under elegant shift prefer cloud inspire arrive"
        let changed = false;
        let pass = "";
        for(let i = 0; i< passphrases.length; i++){
            if(passphrases[i]){
                pass += passphrases[i] + (i == passphrases.length - 1 ? "":" ");
            }else{
                data.error[i] = "The passphrase nr "+ (i+1) + " is empty!";
                changed = true;
            }
        }
        data.passphrase = changed ? undefined : pass;
        return data
    }

    const proceed = () => {
        
    }   


    const handlePasswordCheck = () => {
        if(password.length < 8){
            setError(ErrorType.small);
            return;
        }
        if(password != passwordConfirm){
            setError(ErrorType.unequal);
            return;
        }
        if(passphrases.length == 12){
            const valid = validate();
            if(valid.passphrase){
                otonWallet.signInWithMnemonic(valid.passphrase);
                if(otonWallet){ 
                    proceed();
                }else{
                    dispatch(updatePassphraseErrors(valid.error));
                }
            }else{
                dispatch(updatePassphraseErrors(valid.error));
            }
            
        }
    }

    return (
    <ColumnCenter>
        <ModalHeading>
            Forgot Password
        </ModalHeading>
        <ModalDescription>
            If you forgot your local password don't worry just write the sercret phrase and the new password
        </ModalDescription>                        
        <BackButton onClick={()=> dispatch(setOtonModalType(OtonModalType.Main))}/>
        <Passphrase></Passphrase>
        <FormSection>
            <Form onSubmit={(e)=> e.preventDefault()}>
            <Label>
                Password
            </Label>
            <Container>
                <PasswordCustomContainer error={error == ErrorType.small || error == ErrorType.unequal}>
                    <PasswordCustomInput 
                        id={'input-create-password'}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type={isVisiblePassword? "text": "password"}
                        autoComplete="off"
                        data-testid={'input-create-password'}
                    />
                </PasswordCustomContainer>
                <SideButton 
                    id={`toggle-create-password`} 
                    data-testid={`toggle-create-password`} 
                    emphasis={ButtonEmphasis.medium} 
                    size={ButtonSize.medium} 
                    onClick={() => setVisiblePassword(!isVisiblePassword)}>
                <ShowHideIcon isVisible={isVisiblePassword} />
                </SideButton>
            </Container>
            <ShowBar 
            style={{marginBottom: 10}} 
            value={calculateStrength(password)} 
            prefix="Password Strength:" 
            postfix={error == ErrorType.small ? "Password is too small" : error == ErrorType.unequal ? "Passwords are not the same" : undefined}/>
            <Label>
            Confirm Password
            </Label>
            <Container>
                <PasswordCustomContainer error={error == ErrorType.unequal}>
                    <PasswordCustomInput
                        id={'input-create-confirm'}
                        value={passwordConfirm}
                        onChange={(e)=>setPasswordConfirm(e.target.value)}
                        type={isVisibleConfirm? "text": "password"}
                        autoComplete="off"
                        data-testid={'input-create-confirm'}
                    />
                </PasswordCustomContainer>
                <SideButton 
                    id={`toggle-create-confirm`} 
                    data-testid={`toggle-create-confirm`} 
                    emphasis={ButtonEmphasis.medium} 
                    size={ButtonSize.medium} 
                    onClick={() => setVisibleConfirm(!isVisibleConfirm)}>
                <ShowHideIcon isVisible={isVisibleConfirm} />
                </SideButton>
            </Container>
            <BelowLabel>{error == ErrorType.unequal ? "Passwords are not the same" : ""}</BelowLabel>
            <FormSubmitButton type="submit" onClick={handlePasswordCheck}>Unlock</FormSubmitButton>
            </Form>
        </FormSection>
    </ColumnCenter>
    );
}