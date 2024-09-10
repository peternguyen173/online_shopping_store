package com.IT4409.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class UserAndGroupService {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<Map<String, Object>> fetchAll(String myId){
        List<Map<String, Object>> getAllUser = jdbcTemplate.queryForList("select * from users where id!=?", myId);
        return getAllUser;
    }
    public List<Map<String, Object>> fetchAllGroup(String groupId){
        List<Map<String, Object>> getAllUser = jdbcTemplate.queryForList(
                "select gr.* from groups gr" +
                "join group_members gm on gm.group_id=gr.id and gm.user_id=?",
                groupId);
        return getAllUser;
    }
}
