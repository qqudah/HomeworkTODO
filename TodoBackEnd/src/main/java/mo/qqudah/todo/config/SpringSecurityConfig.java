package mo.qqudah.todo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurityConfig {
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers(HttpMethod.POST, "/api/**").hasRole("PROFESSOR")
                                .requestMatchers(HttpMethod.PUT, "/api/**").hasRole("PROFESSOR")
                                .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("PROFESSOR")
                                .requestMatchers(HttpMethod.GET, "/api/**").hasAnyRole("PROFESSOR","STUDENT")
                                .requestMatchers(HttpMethod.PATCH, "/api/**").hasAnyRole("PROFESSOR","STUDENT")
                                .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails mohannad = User.builder()
                .username("mohannad")
                .password(passwordEncoder().encode("goat123"))
                .roles("STUDENT").build();

        UserDetails profMohannad = User.builder()
                .username("profMohannad")
                .password(passwordEncoder().encode("goat123"))
                .roles("PROFESSOR").build();

        return new InMemoryUserDetailsManager(mohannad, profMohannad);
    }
}
