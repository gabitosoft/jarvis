/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package utils;

/**
 *
 * @author Gabriel Edgar Delgado Rocha
 */

import java.security.MessageDigest;
import java.util.Arrays;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;

public class Encrypter {
    
    public String Encrypt(String text) throws Exception {

        String secretKey = "jarvissensor"; //Key to encrypt data
        String base64EncryptedString = "";

        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] digestOfPassword = md.digest(secretKey.getBytes("utf-8"));
        byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);

        SecretKey key = new SecretKeySpec(keyBytes, "DESede");
        Cipher cipher = Cipher.getInstance("DESede");
        cipher.init(Cipher.ENCRYPT_MODE, key);

        byte[] plainTextBytes = text.getBytes("utf-8");
        byte[] buf = cipher.doFinal(plainTextBytes);
        byte[] base64Bytes = Base64.encodeBase64(buf);
        base64EncryptedString = new String(base64Bytes);

        return base64EncryptedString;
    }
    
    public String Decrypt(String text) throws Exception {

        String secretKey = "jarvissensor"; //Key to decrypt data
        String base64EncryptedString = "";

        byte[] message = Base64.decodeBase64(text.getBytes("utf-8"));
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] digestOfPassword = md.digest(secretKey.getBytes("utf-8"));
        byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
        SecretKey key = new SecretKeySpec(keyBytes, "DESede");

        Cipher decipher = Cipher.getInstance("DESede");
        decipher.init(Cipher.DECRYPT_MODE, key);

        byte[] plainText = decipher.doFinal(message);

        base64EncryptedString = new String(plainText, "UTF-8");

        return base64EncryptedString;
    }
}
