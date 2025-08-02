package com.lojaroupas.api;

import java.util.ArrayList;
import java.util.List;

public class MapperUtils {

    public static <T> List<T> mapToDto(List<Object[]> rows, Class<T> dtoClass) {
        List<T> result = new ArrayList<>();
        try {
            for (Object[] row : rows) {
                T dto = dtoClass.getDeclaredConstructor().newInstance();
                var fields = dtoClass.getDeclaredFields();
                for (int i = 0; i < fields.length; i++) {
                    fields[i].setAccessible(true);
                    fields[i].set(dto, row[i]);
                }
                result.add(dto);
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao mapear DTO", e);
        }
        return result;
    }
}
