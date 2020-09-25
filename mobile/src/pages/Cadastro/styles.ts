import { StyleSheet } from 'react-native';

/* Archivo_400Regular,
Archivo_700Bold,
Poppins_400Regular,
Poppins_600SemiBold, */

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        justifyContent: 'center',
        marginBottom: 100,
    },

    inputTitle: {
        marginLeft: '5%',
        fontSize: 25,
        fontFamily: 'Poppins_600SemiBold',
        marginTop: 50,
    },

    inputGroup: {
        width: '90%',
        alignSelf: 'center',
    },

    nameText: {
        borderColor: '#fff',
        borderBottomColor: '#000',
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 25,
        padding: 10,
        color: '#000',
    },  

    lastNameText: {
        borderColor: '#fff',
        borderBottomColor: '#000',
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 25,
        padding: 10,
        color: '#000',
    },

    enterButton: {
        borderWidth: 2,
        borderColor: '#000',
        height: 70,
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 10, 
        width: '90%',
        alignSelf: 'center'
    },
    enterText: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000'
    }
});

export default styles;
