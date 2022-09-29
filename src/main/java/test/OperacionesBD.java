/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package test;

import beans.Cuartos;
import connection.DBConnection;
import java.sql.ResultSet;
import java.sql.Statement;


public class OperacionesBD {
    
    public static void main(String[] args) {
       // listarPeliculas();
        
        
    }
    public static void actualizarCuarto(int id, String clasificacion){
        DBConnection con = new DBConnection();
        String sql = "UPDATE cuartos SET clasificacion = '"+clasificacion+"' WHERE id = "+id;
        
        try {
            Statement st = con.getConnection().createStatement();
            st.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        finally{
            con.desconectar();
        }
    }
    
    public static void listarCuartos(){
        DBConnection con = new DBConnection();
        String sql = "SELECT * FROM cuartos";
        
         try {
            Statement st = con.getConnection().createStatement();
            ResultSet rs = st.executeQuery(sql);
            while(rs.next()){
                int id = rs.getInt("id");
                String clasificacion = rs.getString("clasificacion");
                int disponibilidad = rs.getInt("disponibilidad");
                
                
                Cuartos cuartos = new Cuartos(id, clasificacion, disponibilidad);
                System.out.println(cuartos.toString());
            }
            st.executeQuery(sql);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
         finally{
             con.desconectar();
         }
        
    }
    
}
