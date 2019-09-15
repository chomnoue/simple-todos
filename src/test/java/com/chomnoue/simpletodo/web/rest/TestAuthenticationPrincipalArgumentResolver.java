package com.chomnoue.simpletodo.web.rest;

import com.chomnoue.simpletodo.security.AuthoritiesConstants;
import com.chomnoue.simpletodo.security.DomainUser;
import java.lang.annotation.Annotation;
import java.util.Collections;
import org.springframework.core.MethodParameter;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class TestAuthenticationPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return findMethodAnnotation(AuthenticationPrincipal.class, parameter) != null;
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter,
        ModelAndViewContainer modelAndViewContainer,
        NativeWebRequest nativeWebRequest,
        WebDataBinderFactory webDataBinderFactory) {
        return new DomainUser(1L, "test-user", "test-password",
            Collections.singletonList(new SimpleGrantedAuthority(AuthoritiesConstants.USER)));
    }

    private <T extends Annotation> T findMethodAnnotation(Class<T> annotationClass,
        MethodParameter parameter) {
        T annotation = parameter.getParameterAnnotation(annotationClass);
        if (annotation != null) {
            return annotation;
        }
        Annotation[] annotationsToSearch = parameter.getParameterAnnotations();
        for (Annotation toSearch : annotationsToSearch) {
            annotation = AnnotationUtils.findAnnotation(toSearch.annotationType(),
                annotationClass);
            if (annotation != null) {
                return annotation;
            }
        }
        return null;
    }
}
