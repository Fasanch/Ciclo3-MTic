/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package beans;


public class Cuartos {
    private int id;
    private String clasificacion;
    private int disponibilidad;

    public Cuartos(int id, String clasificacion, int disponibilidad) {
        this.id = id;
        this.clasificacion = clasificacion;
        this.disponibilidad = disponibilidad;
        
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getClasificacion() {
        return clasificacion;
    }

    public void setClasificacion(String clasificacion) {
        this.clasificacion = clasificacion;
    }

    public int getDisponibilidad() {
        return disponibilidad;
    }

    public void setDisponibilidad(int disponibilidad) {
        this.disponibilidad = disponibilidad;
    }


    @Override
    public String toString() {
        return "Cuartos{" + "id=" + id + ", clasificacion=" + clasificacion + ", disponibilidad=" + disponibilidad + '}';
    }
    
    
    
}
