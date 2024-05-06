package com.acme.modres;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.websphere.servlet.filter.ServletChain;

@WebServlet("/resorts/welcome")
public class WelcomeServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain");
		
		ServletChain servletChain = new ServletChain();
		servletChain.addRequestDispatcher(request.getRequestDispatcher("/first"));
		servletChain.addRequestDispatcher(request.getRequestDispatcher("/second"));
		servletChain.include(request, response);
		
		PrintWriter out = response.getWriter(); 
        out.println(" Enjoy!");
	}
}
