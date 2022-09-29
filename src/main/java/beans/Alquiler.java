/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package beans;

import java.sql.Date;

/**
 *
 * @author hfabi
 */
public class Alquiler {
    
    private int id;
    private String username;
    private Date fechaAlquiler;
    private String clasificacion;
   

    public Alquiler(int id, String username, Date fechaAlquiler) {
        this.id = id;
        this.username = username;
        this.fechaAlquiler = fechaAlquiler;
        
    }

    public Alquiler(int id, Date fechaAlquiler, String clasificacion) {
        this.id = id;
        this.fechaAlquiler = fechaAlquiler;
        this.clasificacion = clasificacion;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getFechaAlquiler() {
        return fechaAlquiler;
    }

    public void setFechaAlquiler(Date fechaAlquiler) {
        this.fechaAlquiler = fechaAlquiler;
    }

    public String getClasificacion() {
        return clasificacion;
    }

    public void setClasificacion(String clasificacion) {
        this.clasificacion = clasificacion;
    }

    
    

    @Override
    public String toString() {
        return "Alquiler{" + "id=" + id + ", username=" + username + ", fechaAlquiler=" + fechaAlquiler + '}';
    }
    
    
    
    
}
