import React, { useState } from "react";
import { Platform, AccessibilityInfo, View } from 'react-native';
import styled from "styled-components/native";
import { useWindowDimensions } from 'react-native';
import { 
    Head as Web_Head, 
    Container as Web_Container, 
    Images as Web_Images, 
    Sub_Container as Web_Sub_Container, 
    Icon_Images as Web_Icon_Images, 
    Button as Web_Button 
} from "./web_css";

import Header_Img from '../../../../assets/header/Home.png'
import Assinaturas_Img from '../../../../assets/header/Assinaturas.png';
import Transparencia_Img from '../../../../assets/header/Transparencia.png';
import Gerencie_listas_Img from '../../../../assets/header/gerencie_listas.png';
import AtaAi_Img from '../../../../assets/header/AtaAi.png';
import Exit from '../../../../assets/header/Exit.png';
import Hamburguer from '../../../../assets/header/Hamburguer.png';
import Set_Down_Img from '../../../../assets/header/Set_down.png';
import Test_Img from '../../../../assets/header/capivara.jpg';
import { Dimensions } from "react-native";
import { 
    Head as Mob_Head, 
    Container as Mob_Container, 
    Icon_Images as Mob_Icon_Images, 
    Button as Mob_Button, 
    Modal, 
    Modal_Container, 
    Images as Mob_Images,
} from "./mobile_css";
import { Colors, Header_Colors, Pages_Colors } from "./../colors";

export function Header() {
    const [modalVisible, setModalVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(0);
    const [actualyPosition,setActualyPosition] = useState(1)
    const { width, height } = useWindowDimensions();

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    
    const handleBlur = (value: number) => {
        setTooltipVisible(value);
        setTimeout(() => {
            setTooltipVisible(0);
        }, 4000);
    };

    return (
        <>
            {Platform.OS === 'web' || Platform.OS === 'macos' ? 
                <Web_Head $width={width} >
                    <Web_Container>
                        <Web_Button>
                            <Web_Images $width={width} $height={height} />
                        </Web_Button>
                        <Web_Sub_Container $width={width}>
                            <Web_Button><Web_Icon_Images $widths={width} $height={height} source={Header_Img} /></Web_Button>
                            <Web_Button><Web_Icon_Images $widths={width} $height={height} source={Assinaturas_Img} /></Web_Button>
                            <Web_Button><Web_Icon_Images $widths={width} $height={height} source={Transparencia_Img} /></Web_Button>
                            <Web_Button><Web_Icon_Images $widths={width} $height={height} source={Gerencie_listas_Img} /></Web_Button>
                            <Web_Button><Web_Icon_Images $widths={width} $height={height} source={AtaAi_Img} /></Web_Button>
                        </Web_Sub_Container>
                        {/* <Web_Button><Web_Icon_Images $width={width} $height={height} source={Exit} /></Web_Button>
                         */}
                          <Web_Button><Web_Icon_Images $widths={width} $height={height} source={Exit}/></Web_Button>
                    </Web_Container>
                </Web_Head>
            :
                <Mob_Head style={{    shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.9,
                shadowRadius: 2,elevation:15}}>
                    <Mob_Container>
                        <Mob_Button onPress={() => setModalVisible(!modalVisible)}>
                            <Mob_Icon_Images source={Hamburguer} />
                        </Mob_Button>

                        <Modal 
                            animationType="none" 
                            transparent={true} 
                            visible={modalVisible}  
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <Mob_Button  onPress={() => setModalVisible(!modalVisible)}>
                                <Mob_Icon_Images source={Set_Down_Img} style={{width: 28, height: 20, marginTop: 20,marginBottom:20,marginLeft:20, backgroundColor:Header_Colors.background}} />
                            </Mob_Button>
         
                            <Modal_Container style={{}}> 
                                <Mob_Button onLongPress={() => handleBlur(1)} onPress={(()=>setActualyPosition(1))} delayLongPress={300}>
                                    <Mob_Icon_Images source={Header_Img} />
                                </Mob_Button>
                                <Mob_Button onLongPress={() => handleBlur(2)} onPress={(()=>setActualyPosition(2))} delayLongPress={300}>
                                    <Mob_Icon_Images source={Assinaturas_Img}  />
                                </Mob_Button>
                                <Mob_Button onLongPress={() => handleBlur(3)} onPress={(()=>setActualyPosition(3))} delayLongPress={300}>
                                    <Mob_Icon_Images source={Transparencia_Img}  />
                                </Mob_Button>
                                <Mob_Button onLongPress={() => handleBlur(4)} onPress={(()=>setActualyPosition(4))} delayLongPress={300}>
                                    <Mob_Icon_Images source={Gerencie_listas_Img}  />
                                </Mob_Button>
                                <Mob_Button onLongPress={() => handleBlur(5)} onPress={(()=>setActualyPosition(5))} delayLongPress={300}>
                                    <Mob_Icon_Images source={AtaAi_Img}  />
                                    {tooltipVisible !=0  && (
                                        <Tooltip>
                                            <TooltipText>
                                                {tooltipVisible == 5 ? 'Gerencie Atas' :
                                                tooltipVisible == 4 ? 'Gerencie Listas' :
                                                tooltipVisible == 3 ? 'Transparência' :
                                                tooltipVisible == 2 ? 'Suas Assinaturas' :
                                                tooltipVisible == 1 ? 'Home' : 
                                                'Home'}
                                            </TooltipText>
                                        </Tooltip>
                                    )}
                                </Mob_Button>
                            </Modal_Container>
                        </Modal>
                             {actualyPosition ===1? <Mob_Icon_Images source={Header_Img} style={{opacity:0.5 }} />: actualyPosition ===2?<Mob_Icon_Images source={Assinaturas_Img} style={{opacity:0.5 }} />:actualyPosition ===3?<Mob_Icon_Images source={Transparencia_Img} style={{opacity:0.5 }} />:actualyPosition ===4?<Mob_Icon_Images source={Gerencie_listas_Img} style={{opacity:0.5 }} />:<Mob_Icon_Images source={AtaAi_Img} style={{opacity:0.5 }} />}       
                
                        <Mob_Button><Mob_Images  source={Test_Img}/></Mob_Button>
                        
                    </Mob_Container>
                </Mob_Head>
            }
        </>
    );
}

const Tooltip = styled.View`
  position: absolute;
  bottom: 60em; /* Ajuste baseado na posição do botão */
  width: 170em;
  margin-left: -225em;
  margin-bottom: -100em;
  border-radius: 5em;
`;

const TooltipText = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;
