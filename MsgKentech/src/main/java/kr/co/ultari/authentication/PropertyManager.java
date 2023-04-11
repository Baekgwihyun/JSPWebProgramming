package kr.co.ultari.authentication;

import java.io.IOException;
import java.util.Properties;

public class PropertyManager {
	
	Properties properties;
	
	
	public PropertyManager() throws IOException {
		initProperties();
	}

	public String getValue(String key) throws IOException {
		return properties.getProperty(key);
	}
	
	private void initProperties() throws IOException {
		properties = new Properties();
		String protPath = "/config/Config.properties";

		properties.load(getClass().getResourceAsStream(protPath));
	}
}
