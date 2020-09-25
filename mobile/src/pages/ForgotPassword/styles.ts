import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },

    content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header:{
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red',
        marginTop: 20,
    },
    
    logo: {
        fontSize: 70,
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
    },

    logoText: {
        fontSize: 20,
        marginLeft: 35,
        color: '#fff',
        fontFamily: 'Poppins_400Regular',
    },

    contentText: {
        width: '90%',
        marginTop: 20,
    },

    title: {
        color: '#fff',
        fontSize: 30,
        marginBottom: 20,
    },

    text: {
        color: '#fff',
        fontSize: 20,
    },

    emailText: {
        borderBottomColor: '#fff',
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 20,
        color: '#fff',   
        padding: 10,
        marginTop: 50,
    },

    enterButton: {        
        borderWidth: 2,
        borderColor: '#fff',
        height: 70,
        marginTop: 90,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 10, 
    },

    enterText: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff'
    }
});

export default styles;