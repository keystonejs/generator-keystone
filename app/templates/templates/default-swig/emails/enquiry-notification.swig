{# TODO:
   Jade email templates inherit a default base that's included with Keystone,
   the Swig templates need this to be ported across and bundled directly. #}

{% block body-contents %}
	<h1>Hi {{ first_name }}</h1>,
	<p class="text-larger">An enquiry was just submitted to {{ brand }}:</p>
	{% if enquiry.name.full or enquiry.email %}
		<p class="text-larger">From
			{% if enquiry.name.full %}
				<strong>{{ enquiry.name.full }}</strong>
			{% endif %}
			{% if enquiry.name.full and enquiry.email %}
				{% if enquiry.email %}(<a href="mailto:{{ enquiry.email }}">{{ enquiry.email }}</a>){% endif %}
			{% endif %}
		</p>
	{% endif %}
	{% if enquiry.phone %}
		<p class="text-larger">Phone: {{ enquiry.phone }}</p>
	{% endif %}
	{% if enquiry.enquiryType %}
		<p class="text-larger">{{ enquiry._.enquiryType.format() }}</p>
	{% endif %}
	{% if enquiry.message %}
		{{ enquiry.message.html | safe }}
	{% endif %}
	<p class="text-muted">Sent {{ enquiry._.createdAt.format() }}</p>
	<p><a href="/keystone/enquiries/{{ enquiry.id }}">Open Keystone</a></p>
{% endblock %}
