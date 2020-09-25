import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    
    content: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header:{
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red',
        marginTop: 90,
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

    ButtonText: {
        fontSize: 40,
        color: '#fff'
    },

    /* Inputs */
    inputContainer: {
        //backgroundColor: 'red',
        width: '90%',
        alignSelf: 'center',
        marginTop: 30,
    },

    inputHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },

    inputTitle: {
        fontSize: 25,
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
        paddingRight: 40,
    },

    createAccountText: {
        fontSize: 16,
        color: '#fff',
        paddingLeft: 25,
    },

    inputGroup: {
        height: '30%',
    },

    emailText: {
        borderBottomColor: '#fff',
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 20,
        color: '#fff',   
        padding: 10,
    },

    passwordText: {
        borderBottomColor: '#fff',
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 20,
        color: '#fff',
        padding: 10,
    },

    /*Footer of login page*/

    inputFooter: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
    },

    rememberBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    rememberText: {
        fontSize: 16,
        color: '#fff',
    },

    forgotPasswordButton: {
        borderWidth: 1,
        borderRadius: 20,
        height: 30,
    },

    forgotPasswordText: {
        fontSize: 16,
        color: '#fff',

    },
    
    enterButton: {        
        borderWidth: 2,
        borderColor: '#fff',
        height: 70,
        marginTop: 30,
        width: 330,
        alignItems: 'center',
        alignSelf: 'center',
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