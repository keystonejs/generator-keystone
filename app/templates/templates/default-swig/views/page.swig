{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
				<article>
					<hr>
					{% if not data.page %}
						<h2>Invalid Page.</h2>
					{% else %}
						<header>
							<h1>{{ data.page.title }}</h1>
						</header>
						<div class="post">
							{{ data.page.content | raw }}
						</div>
					{% endif %}
				</article>
			</div>
		</div>
	</div>
{% endblock %}
