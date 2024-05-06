package com.acme.modres;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SecondServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain");  
		BufferedReader rd = req.getReader();
		String rcontents = rd.lines().collect(Collectors.joining());
	    PrintWriter out = response.getWriter();  
	    out.print(rcontents + " to our site! ");  
	}
}
