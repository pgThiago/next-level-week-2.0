import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleText: {
        width: 200,
        color: '#fff',
        fontSize: 30,
        marginBottom: 20,
        marginLeft: 45,
    },

    text: {
        width: 300,
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 75,
    },
   
    buttonText: {
        fontSize: 40,
        color: '#fff'
    },

    button: {
        width: '100%',
    },

   
    enterButton: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#fff',
        height: 70,
        marginTop: 90,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 10, 
        width: '90%',
        alignSelf: 'center',
    },

    enterText: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff'
    }

});

export default styles;